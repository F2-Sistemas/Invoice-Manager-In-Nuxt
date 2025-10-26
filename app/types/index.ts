export interface Invoice {
    id: string;
    clientId: string;
    client: Client;
    issueDate: string;
    dueDate: string;
    currency: string;
    status: 'draft' | 'sent' | 'paid' | 'cancelled';
    total: number;
    lineItems: LineItem[];
}

export interface Client {
    id: string;
    name: string;
    email: string;
    country?: string;
    _count?: {
        invoices: number;
    };
}

export interface LineItem {
    id: string;
    invoiceId: string;
    order: number;
    description: string;
    unity: string;
    quantity: number;
    unitPrice: number;
    amount: number;
}

export interface User {
    id: string;
    username: string;
    email: string;
}
