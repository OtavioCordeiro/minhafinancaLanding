import { Check, ExternalLink, Gift, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Plan } from '@/types';

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

function getPlanFeatures(plan: Plan): string[] {
  const features: string[] = [];
  const limits = plan.limits;

  features.push('Dashboard completo');

  if (limits.maxExpenses >= 999999 || limits.maxIncomes >= 999999) {
    features.push('Receitas e despesas ilimitadas');
  } else if (limits.maxExpenses > 0 && limits.maxIncomes > 0) {
    features.push(`Até ${limits.maxExpenses} receitas e despesas`);
  }

  if (limits.maxUsersPerFamily >= 999999) {
    features.push('Usuários ilimitados');
  } else if (limits.maxUsersPerFamily > 0) {
    features.push(`Até ${limits.maxUsersPerFamily} usuários`);
  }

  if (limits.maxCategories >= 999999) {
    features.push('Categorias ilimitadas');
  } else if (limits.maxCategories > 0) {
    features.push(`Até ${limits.maxCategories} categorias`);
  }

  if (plan.features.hasInvestments) {
    if (limits.maxInvestments >= 999999) {
      features.push('Investimentos ilimitados');
    } else if (limits.maxInvestments > 0) {
      features.push(`Até ${limits.maxInvestments} investimentos`);
    }
  }

  if (limits.maxPockets >= 999999) {
    features.push('Caixinhas ilimitadas');
  } else if (limits.maxPockets > 0) {
    features.push(`Até ${limits.maxPockets} caixinhas`);
  }

  if (limits.maxFamilies > 0) {
    if (limits.maxFamilies >= 999999) {
      features.push('Famílias ilimitadas');
    } else if (limits.maxFamilies > 1) {
      features.push(`Até ${limits.maxFamilies} famílias`);
    } else {
      features.push('1 família');
    }
  }

  if (plan.features.hasAdvancedReports) {
    features.push('Relatórios avançados');
  }

  if (plan.features.hasExportData) {
    if (limits.maxExport >= 999999) {
      features.push('Exportação ilimitada');
    } else if (limits.maxExport > 0) {
      features.push(`Até ${limits.maxExport} exportações`);
    }
  }

  if (plan.features.hasImportData) {
    if (limits.maxImport >= 999999) {
      features.push('Importação ilimitada');
    } else if (limits.maxImport > 0) {
      features.push(`Até ${limits.maxImport} importações`);
    }
  }

  if (plan.features.hasPrioritySupport) {
    features.push('Suporte prioritário');
  }

  return features;
}

interface PricingCardProps {
  plan: Plan;
  planLabel: string;
  isPopular?: boolean;
  isCurrent?: boolean;
  isLoading?: boolean;
  buttonText: string;
  onSelect: () => void;
  onManage?: () => void;
  compact?: boolean;
}

export function PricingCard({
  plan,
  planLabel,
  isPopular = false,
  isCurrent = false,
  isLoading = false,
  buttonText,
  onSelect,
  onManage,
  compact = false,
}: PricingCardProps) {
  const features = getPlanFeatures(plan);
  const isFree = plan.price === 0;

  return (
    <div
      className={cn(
        'relative flex flex-col rounded-2xl border-2 transition-all',
        compact ? 'p-4' : 'p-6',
        isPopular
          ? 'border-[#30A75C] bg-[#30A75C] text-white shadow-xl'
          : 'border-border bg-card hover:border-[#30A75C]/50'
      )}
    >
      {isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#6DDB0D] text-[#030213] px-4 py-1 rounded-full text-sm font-medium whitespace-nowrap">
          Mais Escolhido
        </div>
      )}

      {isCurrent && (
        <div className="absolute -top-3 right-4 bg-green-500 text-white px-4 py-1 rounded-full text-sm font-medium whitespace-nowrap">
          Plano Atual
        </div>
      )}

      <div className={compact ? 'mb-2' : 'mb-4'}>
        <h3 className={cn(compact ? 'text-base font-bold mb-0.5' : 'text-xl font-bold mb-1', isPopular ? 'text-white' : 'text-foreground')}>
          {planLabel}
        </h3>
        {!compact && plan.description && (
          <p className={cn('text-sm', isPopular ? 'text-white/80' : 'text-muted-foreground')}>
            {plan.description}
          </p>
        )}
      </div>

      <div className={compact ? 'mb-3' : 'mb-5'}>
        {isFree ? (
          <div className={cn(compact ? 'text-2xl font-bold' : 'text-4xl font-bold', isPopular ? 'text-white' : 'text-foreground')}>
            Grátis
          </div>
        ) : (
          <>
            <div className="flex items-baseline gap-1">
              <span className={cn(compact ? 'text-2xl font-bold' : 'text-4xl font-bold', isPopular ? 'text-white' : 'text-foreground')}>
                {formatCurrency(plan.monthlyPrice)}
              </span>
              <span className={cn('text-sm', isPopular ? 'text-white/80' : 'text-muted-foreground')}>
                /mês
              </span>
            </div>
            {plan.price > plan.monthlyPrice && (
              <p className={cn('text-xs mt-1', isPopular ? 'text-white/70' : 'text-muted-foreground')}>
                {formatCurrency(plan.price)} cobrado {plan.billingInterval.toLowerCase()}
              </p>
            )}
          </>
        )}
      </div>

      {!compact && isFree && plan.trialDays > 0 && (
        <div className="flex items-center gap-2 bg-[#ECFAF2] border border-[#30A75C]/30 rounded-lg px-3 py-2.5 mb-5">
          <Gift className="w-4 h-4 text-[#30A75C] flex-shrink-0" />
          <div>
            <p className="text-xs font-semibold text-[#30A75C]">
              {plan.trialDays} dias de acesso completo
            </p>
            <p className="text-xs text-muted-foreground">Sem necessidade de cartão</p>
          </div>
        </div>
      )}

      {isCurrent && onManage ? (
        <button
          onClick={onManage}
          className={cn(
            'w-full px-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2 border',
            compact ? 'py-2 mb-3 text-sm' : 'py-3 mb-5',
            isPopular
              ? 'border-white/40 text-white hover:bg-white/10'
              : 'border-border text-foreground hover:bg-muted'
          )}
        >
          Gerenciar Assinatura
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      ) : (
        <button
          onClick={onSelect}
          disabled={isCurrent || isLoading}
          className={cn(
            'w-full px-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2',
            compact ? 'py-2 mb-3 text-sm' : 'py-3 mb-5',
            isPopular
              ? 'bg-card text-primary hover:bg-muted disabled:opacity-60'
              : 'bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-60',
            isCurrent && 'cursor-default'
          )}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Processando...
            </>
          ) : (
            buttonText
          )}
        </button>
      )}

      <ul className={cn('flex-1', compact ? 'space-y-1.5' : 'space-y-2')}>
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2">
            <Check
              className={cn(
                'flex-shrink-0 mt-0.5',
                compact ? 'w-3 h-3' : 'w-4 h-4',
                isPopular ? 'text-white' : 'text-[#30A75C]'
              )}
            />
            <span className={cn(compact ? 'text-xs' : 'text-sm', isPopular ? 'text-white/90' : 'text-foreground')}>
              {feature}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
