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
  tagsTotalCount: number;
  pageSize: number = 2;
  page: number = 1;

  constructor(private tagService: TagService) { }

  ngOnInit() {
    this.getTags(this.getCurrentPaginationSettings());
  }

  getTags(paginationSettings: string) {
    this.tagService.getTags(paginationSettings)
    .subscribe(tagsDTO => {
      this.tags = tagsDTO.tags;
      this.tagsTotalCount = tagsDTO.tagsTotalCount;
    });
  }

  changePage(currentPage: number) {
    this.page = currentPage;
    this.getTags(this.getCurrentPaginationSettings());
  }

  getCurrentPaginationSettings() : string {
      return "?page=" + (this.page - 1) + "&size=" + this.pageSize;
  }
}
