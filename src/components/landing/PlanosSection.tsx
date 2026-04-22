import { useState, useEffect, useMemo } from 'react';
import { PricingCard } from '@/components/shared/PricingCard';
import { cn } from '@/lib/utils';
import api from '@/services/api';
import type { Plan } from '@/types';

interface PlanosSectionProps {
  onOpenRegisterModal: () => void;
  initialPlans?: Plan[];
}

export function PlanosSection({ onOpenRegisterModal, initialPlans }: PlanosSectionProps) {
  const [plans, setPlans] = useState<Plan[]>(() =>
    initialPlans ? initialPlans.filter(p => p.isActive) : []
  );
  const [loading, setLoading] = useState(!initialPlans);
  const [billingPeriod, setBillingPeriod] = useState('');

  useEffect(() => {
    if (initialPlans) return;
    api.get<Plan[]>('/api/landingpage/plans', false)
      .then(d => setPlans(d.filter(p => p.isActive)))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const freePlanType = useMemo(
    () => plans.find(p => p.price === 0)?.type ?? null,
    [plans]
  );

  const plansByType = useMemo(() => {
    const grouped: Record<string, Plan[]> = {};
    for (const plan of plans) {
      if (!grouped[plan.type]) grouped[plan.type] = [];
      grouped[plan.type].push(plan);
    }
    return grouped;
  }, [plans]);

  const planTypes = useMemo(() => {
    return Object.entries(plansByType)
      .map(([type, ps]) => ({ type, minPrice: Math.min(...ps.map(p => p.price)) }))
      .sort((a, b) => a.minPrice - b.minPrice)
      .map(({ type }) => type);
  }, [plansByType]);

  const popularPlanType = useMemo(
    () => planTypes.find(t => t !== freePlanType) ?? null,
    [planTypes, freePlanType]
  );

  const availableIntervals = useMemo(() => {
    const paidPlans = Object.entries(plansByType)
      .filter(([type]) => freePlanType === null || type !== freePlanType)
      .flatMap(([, ps]) => ps);

    const intervalPrices = new Map<string, number>();
    for (const plan of paidPlans) {
      if (!intervalPrices.has(plan.billingInterval)) {
        intervalPrices.set(plan.billingInterval, plan.monthlyPrice);
      }
    }
    return Array.from(intervalPrices.entries())
      .sort(([, a], [, b]) => b - a)
      .map(([interval]) => interval);
  }, [plansByType, freePlanType]);

  const activePeriod = billingPeriod || availableIntervals[availableIntervals.length - 1] || '';
  const bestInterval = availableIntervals[availableIntervals.length - 1];

  const visiblePlans = useMemo(() => {
    return planTypes.map(type => {
      const ps = plansByType[type] ?? [];
      const plan = ps.find(p => p.billingInterval === activePeriod) ?? ps[0];
      return plan ? { type, plan } : null;
    }).filter(Boolean) as { type: string; plan: Plan }[];
  }, [planTypes, plansByType, activePeriod]);

  return (
    <section id="planos" className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Planos simples e sem surpresas
          </h2>
          <p className="text-lg text-gray-600">
            Comece grátis e evolua quando precisar.
          </p>

          {!loading && availableIntervals.length > 1 && (
            <div className="flex justify-center mt-8">
              <div className="inline-flex bg-muted rounded-lg p-1">
                {availableIntervals.map(interval => (
                  <button
                    key={interval}
                    type="button"
                    onClick={() => setBillingPeriod(interval)}
                    className={cn(
                      'relative px-5 py-2 rounded-md text-sm font-medium transition-all',
                      activePeriod === interval
                        ? 'bg-background text-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    {interval}
                    {interval === bestInterval && (
                      <span className="absolute -top-2 -right-2 bg-[#6DDB0D] text-[#030213] text-[10px] px-1.5 py-0.5 rounded-full font-medium leading-none">
                        Melhor
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {loading ? (
          <div className={cn(
            'grid gap-6',
            'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto'
          )}>
            {[1, 2, 3].map(i => (
              <div key={i} className="rounded-2xl border-2 border-border p-6 animate-pulse">
                <div className="h-5 bg-muted rounded w-1/3 mb-3" />
                <div className="h-8 bg-muted rounded w-1/2 mb-5" />
                <div className="h-10 bg-muted rounded mb-5" />
                <div className="space-y-2">
                  {[1, 2, 3, 4].map(j => <div key={j} className="h-4 bg-muted rounded" />)}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={cn(
            'grid gap-6',
            visiblePlans.length === 1 && 'grid-cols-1 max-w-sm mx-auto',
            visiblePlans.length === 2 && 'grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto',
            visiblePlans.length >= 3 && 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto'
          )}>
            {visiblePlans.map(({ type, plan }) => (
              <PricingCard
                key={plan.id}
                plan={plan}
                planLabel={plan.name}
                isPopular={type === popularPlanType}
                isCurrent={false}
                isLoading={false}
                buttonText={type === freePlanType ? 'Começar grátis' : 'Assinar agora'}
                onSelect={onOpenRegisterModal}
              />
            ))}
          </div>
        )}

        <p className="text-center text-sm text-muted-foreground mt-10">
          Cancele quando quiser · Sem fidelidade · Pagamento seguro
        </p>
      </div>
    </section>
  );
}
