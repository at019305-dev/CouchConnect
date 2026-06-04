import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { BackButtonComponent } from '../../../shared/back-button/back-button.component';
import { StayService } from '../../../core/services/stay.service';
import { AuthService } from '../../../core/services/auth.service';
import { ChatService } from '../../../core/services/chat.service';

@Component({
  selector: 'app-my-stay-requests',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent, BackButtonComponent],
  template: `
    <app-navbar />
    <div style="padding-top:80px;max-width:860px;margin:0 auto;padding:80px 24px 60px;">
      <app-back-btn />
      <h1 style="font-size:24px;font-weight:800;margin-bottom:24px;">My Stay Requests</h1>
      <div *ngIf="loading" style="color:#888;text-align:center;padding:40px;">Loading...</div>
      <div *ngIf="!loading && requests.length === 0" style="text-align:center;padding:60px;color:#888;">
        <div style="font-size:48px;margin-bottom:16px;">🏠</div>
        <p>No requests yet. Find a local to stay with!</p>
        <a routerLink="/locals" class="btn-primary" style="display:inline-block;margin-top:16px;">Find Locals</a>
      </div>
      <div *ngFor="let r of requests" class="card" style="margin-bottom:16px;display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px;">
        <div>
          <div style="font-weight:700;margin-bottom:4px;">Stay with {{ r.localId?.name || 'Local' }}</div>
          <div style="font-size:13px;color:#888;">{{ r.fromDate | date:'mediumDate' }} → {{ r.toDate | date:'mediumDate' }}</div>
          <div *ngIf="r.message" style="font-size:13px;color:#555;margin-top:6px;">{{ r.message }}</div>
        </div>
        <div style="display:flex;align-items:center;gap:10px;flex-shrink:0;">
          <span [class]="statusClass(r.status)">{{ r.status }}</span>
          <button *ngIf="r.status === 'accepted'" (click)="openChat(r)" class="btn-primary" style="padding:6px 14px;font-size:13px;border-radius:20px;cursor:pointer;">💬 Chat</button>
        </div>
      </div>
    </div>
  `,
  styles: [`:host{display:block;} :host-context(body.dark) h1{color:#f0f0f0;} :host-context(body.dark) .card{background:#1a1a1a;border-color:#2a2a2a;} :host-context(body.dark) div[style*="font-weight:700"]{color:#f0f0f0;}`]
})
export class MyStayRequestsComponent implements OnInit {
  requests: any[] = [];
  loading = true;

  constructor(private staySvc: StayService, private authSvc: AuthService, private chatSvc: ChatService, private router: Router) {}
  ngOnInit() { this.staySvc.myRequests().subscribe(r => { this.requests = r; this.loading = false; }); }
  statusClass(s: string) { return s === 'accepted' ? 'verified-chip' : s === 'rejected' ? 'status-rejected' : 'status-pending'; }
  openChat(r: any) {
    const me = this.authSvc.user()?._id;
    const localId = r.localId?._id || r.localId;
    const chatId = this.chatSvc.buildChatId(me, localId);
    this.router.navigate(['/messages', chatId]);
  }
}
