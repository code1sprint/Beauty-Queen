export interface Service {
  id: string;
  name: string;
  description: string;
  price: string;
  duration: string;
  category: 'hair' | 'makeup' | 'nail' | 'skin';
  popular: boolean;
}

export interface Staff {
  id: string;
  name: string;
  role: string;
  specialty: string;
  image: string;
  rating: number;
}

export interface Booking {
  id: string;
  customerName: string;
  customerPhone: string;
  serviceId: string;
  staffId: string;
  date: string;
  time: string;
  notes?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  image: string;
}

export interface Review {
  id: string;
  customerName: string;
  rating: number;
  text: string;
  date: string;
  service: string;
}
