import { HttpClient } from "@angular/common/http";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
@Component({
  selector: "app-editmovie",
  template: `
    <div class="modal">
      <div class="modal-backdrop" (click)="closeModal()"></div>
      <div class="modal-content">
        <div class="modal-header">
          <h3>Edit Movie</h3>
          <span style="padding: 10px;cursor: pointer;" (click)="closeModal()"
            >X</span
          >
        </div>
        <div class="modal-body content">
          <div class="inputField">
            <div class="label"><label>Name</label></div>
            <div>
              <input id="addMovieName" type="text" value="{{ movie?.attributes.name }}" />
            </div>
          </div>
          <div class="inputField">
            <div class="label"><label>ImageUrl</label></div>
            <div>
              <input
                id="addMovieImageUrl"
                type="text"
                value="{{ movie?.attributes.imageUrl }}"
              />
            </div>
          </div>
          <div style="width: 100%;">
            <div class="label"><label>Synopsis</label></div>
            <div>
              <textarea id="addMovieSynopsis" name="addMovieSynopsis" rows="6" cols="50" value="{{ movie?.attributes.synopsis }}"></textarea>
            </div>
          </div>
          <div class="inputField">
            <div class="label"><label>Year</label></div>
            <div>
              <input id="addMovieYear" type="text" value="{{ movie?.attributes.year }}" />
            </div>
          </div>
          <div class="inputField">
            <div class="label"><label>Genre</label></div>
            <div>
              <input
                id="addMovieGenre"
                type="text"
                value="{{ movie?.attributes.genre }}"
              />
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button (click)="closeModal()">Cancel</button>
          <button
            [disabled]="disable"
            class="btn"
            (click)="editNewMovie($event)"
          >
            Save
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
      textarea {
        width: 100%;
        padding: 9px;
        font-weight: 400;
        cursor: text;
        outline: 0px;
        border: 1px solid rgb(227, 233, 243);
        border-radius: 2px;
        color: rgb(51, 55, 64);
        background-color: transparent;
        box-sizing: border-box;
      }
    `,
  ],
})
export class EditmovieComponent implements OnInit {
  @Output() closeDialog = new EventEmitter();
  @Output() refreshMovies = new EventEmitter();
  @Input() movie: any;
  disable = false;
  constructor(private http: HttpClient) {}
  ngOnInit(): void {}
  editNewMovie(e: Event) {
    this.disable = true;
    const {
      addMovieName,
      addMovieYear,
      addMovieGenre,
      addMovieImageUrl,
      addMovieSynopsis,
    } = window as any;

    const newData = {};

    if (addMovieName.value.trim() !== '') {
      newData['name'] = addMovieName.value;
    }

    if (addMovieYear.value.trim() !== '') {
      newData['year'] = addMovieYear.value;
    }

    if (addMovieSynopsis.value.trim() !== '') {
      newData['synopsis'] = addMovieSynopsis.value;
    }

    if (addMovieImageUrl.value.trim() !== '') {
      newData['imageUrl'] = addMovieImageUrl.value;
    }

    if (addMovieGenre.value.trim() !== '') {
      newData['genre'] = addMovieGenre.value;
    }

    if (Object.keys(newData).length === 0) {
      this.disable = false;
      return; // Don't proceed with the update
    }
    
    this.http
      .put("http://localhost:1337/api/movies/" + this.movie?.id, {
        data: newData
      })
      .subscribe(
        (data) => {
          this.disable = false;
          this.closeDialog.emit("");
          window.location.reload();
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