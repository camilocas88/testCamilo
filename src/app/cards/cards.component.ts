import { Component, OnInit } from "@angular/core";
import { CardInterface } from "../models/card-interface";
import { isNullOrUndefined } from "util";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";

@Component({
  selector: "app-cards",
  templateUrl: "./cards.component.html",
  styleUrls: ["./cards.component.scss"],
})
export class CardsComponent implements OnInit {
  cards$ = [];
  jsonVotes: any = [];
  votesJson = [{ id: null, like: 0, unlike: 0 }];
  like: number = 0;
  unLike: number = 0;
  id: number;

  constructor() {
    this.cards$ = [
      {
        id: 1,
        name: "Kanye West",
        category: "1 month ago in Entertainment",
        description:
          "Vestibulum diam ante, porttitor a odio eget, rhoncus neque. Aenean eu velit libero.",
        imageUrl:
          "linear-gradient(to top,rgba(0,0,0,0.9) 0%,rgba(0,0,0,0.61) 37%,rgba(0,0,0,0.0) 74%),url(../../assets/kanye_west.jpg)",
      },
      {
        id: 2,
        name: "Mark Zuckerberg",
        category: "1 month ago in Business",
        description:
          "Vestibulum diam ante, porttitor a odio eget, rhoncus neque. Aenean eu velit libero.",
        imageUrl:
          "linear-gradient(to top,rgba(0,0,0,0.9) 0%,rgba(0,0,0,0.61) 37%,rgba(0,0,0,0.0) 74%),url(../../assets/zuckerberg.jpg)",
      },
      {
        id: 3,
        name: "Cristina Fernández de kirchner",
        category: "1 month ago in Politics",
        description:
          "Vestibulum diam ante, porttitor a odio eget, rhoncus neque. Aenean eu velit libero.",
        imageUrl:
          "linear-gradient(to top,rgba(0,0,0,0.9) 0%,rgba(0,0,0,0.61) 37%,rgba(0,0,0,0.0) 74%),url(../../assets/kirchner.jpg)",
      },
      {
        id: 4,
        name: "Malala Yousafzai",
        category: "1 month ago in Entertainment",
        description:
          "Vestibulum diam ante, porttitor a odio eget, rhoncus neque. Aenean eu velit libero.",
        imageUrl:
          "linear-gradient(to top,rgba(0,0,0,0.9) 0%,rgba(0,0,0,0.61) 37%,rgba(0,0,0,0.0) 74%),url(../../assets/malala.png)",
      },
    ];
  }

  ngOnInit() {
    this.loadRanking();
  }

  loadRanking() {
    this.jsonVotes = localStorage.getItem("ranking");
    if (!isNullOrUndefined(this.jsonVotes)) {
      this.jsonVotes = JSON.parse(this.jsonVotes);

      let test = this.jsonVotes.find((x) => this.jsonVotes.id === 1);
      console.log(test);
    } else {
      JSON.stringify(this.jsonVotes);
    }
  }

  likeFunction() {
    this.like++;
  }
  unLikeFunction() {
    this.unLike++;
  }

  idPeople;
  newCard;
  numberCard = 50;

  votes(id) {
    this.idPeople = id;
    this.jsonVotes = localStorage.getItem("ranking");
    console.log(this.jsonVotes);

    if (!isNullOrUndefined(this.jsonVotes)) {
      if (isNullOrUndefined(this.votesJson[this.idPeople])) {
        let test = { id: this.idPeople, like: this.like, unlike: this.unLike };
        this.votesJson[this.idPeople] = test;
      } else {
        this.votesJson = JSON.parse(this.jsonVotes);
        this.votesJson[this.idPeople].like += this.like;
        this.votesJson[this.idPeople].unlike += this.unLike;
      }
      console.log(this.votesJson);
    } else {
      let test = { id: this.idPeople, like: this.like, unlike: this.unLike };
      this.votesJson[this.idPeople] = test;
      console.log(this.votesJson);
    }

    let card = [this.cards$.find((x) => x.id === 1)];
    let likes = [this.votesJson.find((x) => x.id === 1)];

    this.newCard = [...card, ...likes];

    let number = this.newCard[1].like;

    if (number === 1) {
      this.numberCard = 100;
    } else if (number === 2) {
      this.numberCard = 50;
    } else if (number === 3) {
      this.numberCard = 30;
    }
    console.log(this.newCard[1].like);

    localStorage.setItem("ranking", JSON.stringify(this.votesJson));
    this.like = 0;
    this.unLike = 0;
  }
}
