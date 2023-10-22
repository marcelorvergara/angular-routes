import { Component, OnDestroy, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit, OnDestroy {
  server: {id: number, name: string, status: string};
  serverId: number;
  paramSubscription: Subscription

  constructor(
    private serversService: ServersService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.serverId = Number(this.route.snapshot.params['id'])
    this.paramSubscription = this.route.params.subscribe(
      (params: Params) => {
        this.serverId = params['id']
        this.server = this.serversService.getServer(Number(this.serverId));
      }
      )
    }

    onEdit() {
      // Navigate
      this.router.navigate(['edit'], {relativeTo: this.route, queryParamsHandling: 'preserve'})
    }

    ngOnDestroy(): void {
      this.paramSubscription.unsubscribe();
    }
}
