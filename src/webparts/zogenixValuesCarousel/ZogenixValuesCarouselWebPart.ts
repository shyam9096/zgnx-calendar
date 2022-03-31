import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";

import * as strings from "ZogenixValuesCarouselWebPartStrings";
import Carousal from "./components/ZogenixValuesCarousel";
import { ICarousalProps } from "./components/IZogenixValuesCarouselProps";
require("./components/carousel.scss");

export interface IZogenixValuesCarouselWebPartProps {
  description: string;
  context: any;
  Listname: string;
  Viewfieldname: string;
  Expandfieldname : string
}

export default class ZogenixValuesCarouselWebPart extends BaseClientSideWebPart<IZogenixValuesCarouselWebPartProps> {
  public render(): void {
    const element: React.ReactElement<ICarousalProps> = React.createElement(
      Carousal,
      {
        description: this.properties.description,
        context: this.context,
        Listname: this.properties.Listname,
        Viewfieldname: this.properties.Viewfieldname,
        Expandfieldname: this.properties.Expandfieldname
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription,
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField("Listname", {
                  label: "List Name",
                }),
                PropertyPaneTextField("Viewfieldname", {
                  label: "View Field Name",
                }),
                PropertyPaneTextField("Expandfieldname", {
                  label: "Expand Field Name",
                }),
                PropertyPaneTextField("timeout", {
                  label: "Slide Interval",
                })
              ],
            },
          ],
        },
      ],
    };
  }
}
