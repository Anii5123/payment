import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { jsPDF } from 'jspdf';

interface BillItem {
  name: string;
  quantity: number;
  price: number;
}

interface Bill {
  orderId: string;
  paymentId: string;
  amount: number;
  date: Date;
  items: BillItem[];
}

@Component({
  selector: 'app-bill-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})
export class BillPageComponent {
  bills: Bill[] = [
    {
      orderId: 'ORD-3001',
      paymentId: 'PAY-9001',
      amount: 210,
      date: new Date('2024-04-01'),
      items: [
        { name: 'Cheese Pizza', quantity: 2, price: 12.25 },
        { name: 'Garlic Bread', quantity: 1, price: 4 },
        { name: 'Pepsi', quantity: 2, price: 3.5 }
      ]
    },
    {
      orderId: 'ORD-3002',
      paymentId: 'PAY-9002',
      amount: 32.00,
      date: new Date('2024-04-03'),
      items: [
        { name: 'Veg Burger', quantity: 1, price: 7 },
        { name: 'Fries', quantity: 1, price: 4 },
        { name: 'Milkshake', quantity: 2, price: 10.5 }
      ]
    }
  ];

  selectedBill: Bill | null = null;

  selectBill(bill: Bill) {
    this.selectedBill = bill;
  }

  handleKeyDown(event: KeyboardEvent, bill: Bill) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.selectBill(bill);
    }
  }

  downloadBill() {
    if (this.selectedBill) {
      const bill = this.selectedBill;
      const doc = new jsPDF();

      // Header
      doc.setFontSize(18);
      doc.setTextColor(40);
      doc.text('Order Invoice', 80, 20);

      // Order Info
      doc.setFontSize(12);
      doc.text(`Order ID   : ${bill.orderId}`, 20, 35);
      doc.text(`Payment ID : ${bill.paymentId}`, 20, 43);
      doc.text(`Date       : ${new Date(bill.date).toLocaleDateString()}`, 20, 51);

      // Table Headers
      let y = 70;
      doc.setFontSize(13);
      doc.text('Item', 20, y);
      doc.text('Qty', 90, y);
      doc.text('Price', 120, y);
      doc.text('Total', 160, y);

      doc.setFontSize(12);
      y += 10;

      // Table Body
      bill.items.forEach(item => {
        const total = item.quantity * item.price;
        doc.text(item.name, 20, y);
        doc.text(item.quantity.toString(), 90, y);
        doc.text(`₹${item.price.toFixed(2)}`, 120, y);
        doc.text(`₹${total.toFixed(2)}`, 160, y);
        y += 10;
      });

      // Total
      y += 10;
      doc.setFontSize(14);
      doc.text(`Total Amount: ₹${bill.amount.toFixed(2)}`, 20, y);

      // Footer
      y += 20;
      doc.setFontSize(12);
      doc.text('Thank you for your purchase!', 20, y);

      // Save PDF
      doc.save(`Bill-${bill.orderId}.pdf`);
    }
  }
}
