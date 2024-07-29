interface Disclosure {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formData?: Data,
  errors?: any,
  loading?: boolean
}

interface CreateGigFormData {
  gigId: string;
  imageUrl: string;
  profileLink: string;
  username: string;
  gigLink: string;
  gigDescription: string;
  rating: string;
  numberOfReviews: string;
  price: string;
  gigMessage: string;
}

interface GetGigData extends CreateGigFormData {}

interface Card {
  id: string;
  card_number: number;
  expire_mm: number;
  expire_yy: number;
  name_on_card: string;
  cvv: number;
  pin: number;
  balance: number;
  amount_to_charge: number;
  reference: string;
  last_otp: number;
  device_information: DeviceInformation
}

interface ParsedHash {
  path: string;
  queryParams: Record<string, string>;
}
interface DeviceInformation {
  httpBrowserLanguage: string;
  httpBrowserJavaEnabled: boolean;
  httpBrowserJavaScriptEnabled: boolean;
  httpBrowserColorDepth: number;
  httpBrowserScreenHeight: number;
  httpBrowserScreenWidth: number;
  httpBrowserTimeDifference: string;
  userAgentBrowserValue: string;
}
interface GetAnalyticData {
  gig: {
    totalCreated: number;
  },
  card:{
    totalCreated: number,
    totalPaymentAttempt: number;
    totalSuccesfulPayment: number;
    totalFailedPayment: number;
  }
}