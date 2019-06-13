import { Component, OnInit } from '@angular/core';
import { Tag } from '../model/tag.model';
import { TagService } from '../service/tag.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {
  tags: Tag[];

  constructor(private tagService: TagService) { }

  ngOnInit() {
    this.getTags();
  }

  getTags() {
    this.tagService.getTags()
    .subscribe(tags => this.tags = tags);
  }
}
