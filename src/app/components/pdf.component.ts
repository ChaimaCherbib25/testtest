import { Component, Input, EventEmitter, Output, OnInit } from "@angular/core";
import $ from "jquery";
import "jquery-ui-dist/jquery-ui.css";

import "easy-autocomplete/dist/easy-autocomplete.css";

import "jquery-bar-rating/jquery.barrating.js";
import "jquery-bar-rating/dist/themes/fontawesome-stars.css";

import "bootstrap/dist/css/bootstrap.css"
import "bootstrap-datepicker/dist/css/bootstrap-datepicker.css";

import moment from "moment";
import "bootstrap-datepicker/dist/js/bootstrap-datepicker.js"

import "bootstrap-slider/dist/css/bootstrap-slider.css";

import Inputmask from 'inputmask';
import 'inputmask/dist/inputmask/phone-codes/phone';

import noUiSlider from 'nouislider';
import "nouislider/distribute/nouislider.min.css";

import select2Init from 'select2';
import 'select2/dist/css/select2.min.css';

import Sortable from 'sortablejs';

import * as SurveyCore from "survey-core";

import * as Survey from "survey-angular";
import * as SurveyPDF from "survey-pdf";
import * as widgets from "surveyjs-widgets";


import "survey-angular/modern.css";

@Component({
    // tslint:disable-next-line:component-selector
    selector: "survey-pdf",
    template: `<div class="survey-container contentcontainer codecontainer">
    <div id="surveyElement"></div>
    <div id="surveyPdfContainer"></div>
  </div>`
})
export class PdfComponent implements OnInit {
    @Output() submitSurvey = new EventEmitter<any>();
    @Input()
    result: any;

    ngOnInit() {
        widgets.prettycheckbox(Survey);
widgets.select2(Survey, $);
widgets.inputmask(Survey);
widgets.jquerybarrating(Survey, $);
widgets.jqueryuidatepicker(Survey, $);
widgets.nouislider(Survey);
widgets.select2tagbox(Survey, $);
widgets.sortablejs(Survey);
widgets.ckeditor(Survey);
widgets.autocomplete(Survey, $);
widgets.bootstrapslider(Survey);

widgets.prettycheckbox(SurveyCore);
widgets.select2(SurveyCore, $);
widgets.inputmask(SurveyCore);
widgets.jquerybarrating(SurveyCore, $);
widgets.jqueryuidatepicker(SurveyCore, $);
widgets.nouislider(SurveyCore);
widgets.select2tagbox(SurveyCore, $);
widgets.sortablejs(SurveyCore);
widgets.ckeditor(SurveyCore);
widgets.autocomplete(SurveyCore, $);
widgets.bootstrapslider(SurveyCore);

        Survey.StylesManager.applyTheme("modern");

        const json = {
  "questions": [
    {
      "type": "tagbox",
      "choicesByUrl": {
        "url": "https://restcountries.eu/rest/v2/all"
      },
      "name": "countries",
      "title": "Tagbox"
    },
    {
      "name": "date",
      "type": "datepicker",
      "inputType": "date",
      "title": "Datepicker",
      "dateFormat": "mm/dd/yy"
    },
    {
      "name": "bootdate",
      "type": "bootstrapdatepicker",
      "inputType": "date",
      "title": "Bootstrap Datepicker",
      "dateFormat": "mm/dd/yy"
    },
    {
      "type": "dropdown",
      "renderAs": "select2",
      "choicesByUrl": {
        "url": "https://restcountries.eu/rest/v2/all"
      },
      "name": "countriesselect2",
      "title": "Select 2"
    },
    {
      "type": "radiogroup",
      "name": "position",
      "title": "ICheck radiogroup",
      "colCount": 0,
      "choices": [ "1|Designer", "2|Front-end Developer", "3|Back-end Developer", "4|Database Administrator", "5|System Engineer" ]
    },
    {
      "type": "barrating",
      "name": "bar",
      "ratingTheme": "fontawesome-stars",
      "title": "Barrating",
      "choices": [ "1", "2", "3", "4", "5" ]
    },
    {
      "type": "matrix",
      "name": "quality",
      "title": "ICheck matrix",
      "columns": [
        {
          "value": 1,
          "text": "Strongly Disagree"
        },
        {
          "value": 2,
          "text": "Disagree"
        },
        {
          "value": 3,
          "text": "Neutral"
        },
        {
          "value": 4,
          "text": "Agree"
        },
        {
          "value": 5,
          "text": "Strongly Agree"
        }
      ],
      "rows": [
        {
          "value": "affordable",
          "text": "Product is affordable"
        },
        {
          "value": "does what it claims",
          "text": "Product does what it claims"
        },
        {
          "value": "better then others",
          "text": "Product is better than other products on the market"
        },
        {
          "value": "easy to use",
          "text": "Product is easy to use"
        }
      ]
    },
    {
      "type": "sortablelist",
      "name": "lifepriority",
      "title": "SortableJS",
      "choices": [ "family", "work", "pets", "travels", "games" ]
    },
    {
      "type": "nouislider",
      "name": "range",
      "title": "NoUiSlider"
    },
    {
      "type": "signaturepad",
      "name": "sign",
      "title": "SignaturePad"
    },
    {
      "type": "text",
      "inputMask": "currency",
      "name": "currency",
      "title": "Inputmask"
    },
    {
      "type": "editor",
      "name": "ckeditor",
      "title": "CK Editor"
    },
    {
      "name": "autocomplete",
      "title": "Autocomplete",
      "type": "text",
      "choices": [
        "None",
        "Ford",
        "Vauxhall",
        "Volkswagen",
        "Nissan",
        "Audi",
        "Mercedes-Benz",
        "BMW",
        "Peugeot",
        "Toyota",
        "Citroen"
      ]
    },
    {
      "type": "bootstrapslider",
      "name": "Bootstrap Slider",
      "step": 50,
      "rangeMin": 100,
      "rangeMax": 1000
    },
    {
      "type": "emotionsratings",
      "name": "emotionsratings-widget",
      "title": "Emotions Ratings",
      "choices": [ "1", "2", "3", "4", "5" ]
    }
  ]
};
const survey = new Survey.Model(json);

        

        function saveSurveyToPdf(filename, surveyModel, pdfWidth, pdfHeight) {
   var options = {
        format: [pdfWidth, pdfHeight]
    };
    var surveyPDF = new SurveyPDF.SurveyPDF(json, options);
    surveyPDF.data = surveyModel.data;
    surveyPDF.save(filename);
}
document.getElementById("saveToPDFbtn").onclick = function() {
  var pdfWidth = survey.pdfWidth || 210;
  var pdfHeight = survey.pdfHeight || 297;
  saveSurveyToPdf("surveyResult.pdf", survey, pdfWidth, pdfHeight);
};

        if (typeof survey === "undefined") return;

        Survey.SurveyNG.render("surveyElement", { model: survey });
    }
}
