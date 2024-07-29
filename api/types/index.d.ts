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

type CreateCardInput = Omit<Card, "pin" | "id" | "balance" | "amount_to_charge" | "reference" | "last_otp">

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


interface Transaction {
  transactionReference: string;
  paymentReference: string;
  merchantName: string;
  apiKey: string;
  enabledPaymentMethod: string[];
  checkoutUrl: string;
}


interface ChargeCard {
  cardToken: string;
  amount: number;
  customerName: string;
  customerEmail: string;
  paymentReference: string;
  paymentDescription: string;
  currencyCode: string;
  contractCode: string;
  apiKey: string;
  metaData: MetaData;
}

interface MetaData {
  ipAddress: string;
  deviceType: string;
}

interface Authenticated {
  accessToken: string;
  expiresIn: number;
}

interface ApiResponse<T> {
  requestSuccessful: boolean,
  responseMessage: string,
  responseCode: number,
  responseBody: T
}

interface DbResponse<T> {
  data: T | undefined
}


interface Gig {
  gigId: string;
  imageUrl: string;
  profileLink: string;
  username: string;
  gigLink: string;
  gigDescription: string;
  rating: number;
  numberOfReviews: number;
  price: number;
  gigMessage: string;
}

interface GetAnalyticData {
  gig: {
    totalCreated: number;
  },
  card:{
    totalCreated: number,
    totalPaymentAttempt: number;
    totalSuccessfulPayment: number;
    totalFailedPayment: number;
  }
}