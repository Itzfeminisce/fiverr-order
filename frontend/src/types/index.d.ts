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
}

interface CardBalance {
  balance: number;
}

interface ParsedHash {
  path: string;
  queryParams: Record<string, string>;
}