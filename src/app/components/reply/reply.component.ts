import { Component, Input, OnInit } from '@angular/core';
import { Reply } from '@AppTypes/appTypes';

@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.scss'],
})
export class ReplyComponent implements OnInit {
  @Input() data: Reply;

  constructor() {}

  ngOnInit() {}
}
