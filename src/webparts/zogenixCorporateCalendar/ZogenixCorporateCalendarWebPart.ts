import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";

import * as strings from "ZogenixCorporateCalendarWebPartStrings";
import ZogenixCorporateCalendar from "./components/ZogenixCorporateCalendar";
import { IZogenixCorporateCalendarProps } from "./components/IZogenixCorporateCalendarProps";

export interface IZogenixCorporateCalendarWebPartProps {
  description: string;
  Category: string;
  Title: string;
  ItemCount: any;
}

export default class ZogenixCorporateCalendarWebPart extends BaseClientSideWebPart<IZogenixCorporateCalendarWebPartProps> {
  public render(): void {
    const element: React.ReactElement<IZogenixCorporateCalendarProps> =
      React.createElement(ZogenixCorporateCalendar, {
        description: this.properties.description,
        context: this.context,
        Category: this.properties.Category,
        Title: this.properties.Title,
        ItemCount: this.properties.ItemCount,
      });

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
                PropertyPaneTextField("Title", {
                  label: "List Name",
                }),
                PropertyPaneTextField("Category", {
                  label: "Category",
                }),
                PropertyPaneTextField("ItemCount", {
                  label: "No of Items",
                }),
              ],
            },
          ],
        },
      ],
    };
  }
}
