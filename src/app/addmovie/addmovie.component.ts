import { HttpClient } from "@angular/common/http";
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
@Component({
  selector: "app-addmovie",
  template: `
    <div class="modal">
      <div class="modal-backdrop" (click)="closeModal()"></div>
      <div class="modal-content">
        <div class="modal-header">
          <h3>Add Movie</h3>
          <span style="padding: 10px;cursor: pointer;" (click)="closeModal()"
            >X</span
          >
        </div>
        <div class="modal-body content">
          <div class="inputField">
            <div class="label"><label>Name</label></div>
            <div><input id="addMovieName" type="text" /></div>
          </div>
          <div class="inputField">
            <div class="label"><label>ImageUrl</label></div>
            <div><input id="addMovieImageUrl" type="text" /></div>
          </div>
          <div class="inputField">
            <div class="label"><label>Synopsis</label></div>
            <div><input id="addMovieSynopsis" type="text" /></div>
          </div>
          <div class="inputField">
            <div class="label"><label>Year</label></div>
            <div><input id="addMovieYear" type="text" /></div>
          </div>
          <div class="inputField">
            <div class="label"><label>Genre</label></div>
            <div><input id="addMovieGenre" type="text" /></div>
          </div>
        </div>
        <div class="modal-footer">
          <button (click)="closeModal()">Cancel</button>
          <button
            [disabled]="disable"
            class="btn"
            (click)="addNewMovie($event)"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .label {
        padding: 4px 0;
        font-size: small;
        color: rgb(51, 55, 64);
      }
      .content {
        display: flex;
        flex-wrap: wrap;
      }
      .inputField {
        margin: 3px 7px;
        flex: 1 40%;
      }
      .modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        z-index: 1000;
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
      }
      .modal-backdrop {
        opacity: 0.5;
        width: inherit;
        height: inherit;
        background-color: grey;
        position: fixed;
      }
      .modal-body {
        padding: 5px;
        padding-top: 15px;
        padding-bottom: 15px;
      }
      .modal-footer {
        padding: 15px 5px;
        display: flex;
        justify-content: space-between;
      }
      .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .modal-header h3 {
        margin: 0;
      }
      .modal-content {
        background-color: white;
        z-index: 1;
        padding: 10px;
        margin-top: 10px;
        width: 520px;
        box-shadow: 0px 11px 15px -7px rgba(0, 0, 0, 0.2), 0px 24px 38px 3px rgba(0, 0, 0, 0.14),
          0px 9px 46px 8px rgba(0, 0, 0, 0.12);
        border-radius: 4px;
      }
    `,
  ],
})
export class AddmovieComponent implements OnInit {
  @Output() closeDialog = new EventEmitter();
  @Output() refreshMovies = new EventEmitter();
  disable = false;
  constructor(private http: HttpClient) {}
  ngOnInit(): void {}
  addNewMovie(e: Event) {
    this.disable = true;
    const {
      addMovieName,
      addMovieYear,
      addMovieGenre,
      addMovieImageUrl,
      addMovieSynopsis,
    } = window as any;
    this.http
      .post("http://localhost:1337/api/movies", {
        data: {
          name: addMovieName.value,
          year: addMovieYear.value,
          synopsis: addMovieSynopsis.value,
          imageUrl: addMovieImageUrl.value,
          genre: addMovieGenre.value,
        }
      })
      .subscribe(
        (data) => {
          this.disable = false;
          this.refreshMovies.emit("");
          this.closeDialog.emit("");
        },
        (err) => {
          this.disable = false;
        }
      );
  }
  closeModal() {
    this.closeDialog.emit("");
  }
}