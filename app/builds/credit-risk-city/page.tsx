import { Metadata } from 'next';
import CityLoader from './CityLoader';

export const metadata: Metadata = {
  title: 'Credit Risk City',
  description: 'A simulation city for mastering the credit-risk ecosystem as a business analyst.',
};

export default function CreditRiskCityPage() {
  return <CityLoader />;
}
