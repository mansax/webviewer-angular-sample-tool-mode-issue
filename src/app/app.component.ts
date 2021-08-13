import { Component, ViewChild, OnInit, Output, EventEmitter, ElementRef, AfterViewInit } from '@angular/core';
import { Subject } from 'rxjs';
import WebViewer from '@pdftron/webviewer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('viewer') viewer: ElementRef;
  wvInstance: any;
  @Output() coreControlsEvent:EventEmitter<any> = new EventEmitter(); 

  private documentLoaded$: Subject<void>;

  constructor() {
    this.documentLoaded$ = new Subject<void>();
  }

  ngAfterViewInit(): void {

    WebViewer({
      path: '../lib',
      initialDoc: '../files/webviewer-demo-annotated.pdf'
    }, this.viewer.nativeElement).then(instance => {
      this.wvInstance = instance;
      console.log('init ToolMode', this.wvInstance.UI.getToolMode().name);
    });
  }

  ngOnInit() {
  }

  getDocumentLoadedObservable() {
    return this.documentLoaded$.asObservable();
  }

  setToolMode() {
    console.log('setToolMode before', this.wvInstance.UI.getToolMode().name);
    this.wvInstance.UI.setToolMode('TextSelect');
    console.log('setToolMode after', this.wvInstance.UI.getToolMode().name);
  }

  loadDocument() {
    console.log('loadDocument before', this.wvInstance.UI.getToolMode().name);
    this.wvInstance.UI.loadDocument('/files/two_pages.pdf');
    console.log('loadDocument after', this.wvInstance.UI.getToolMode().name);
  }

  toggleLeftPanel() {
    console.log('toggleLeftPanel before', this.wvInstance.UI.getToolMode().name);
    this.wvInstance.UI.toggleElementVisibility(['leftPanel']);
    console.log('toggleLeftPanel after', this.wvInstance.UI.getToolMode().name);
  }

  logToolMode() {
    console.log('ToolMode', this.wvInstance.UI.getToolMode().name);
  }
}
