import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'DisplaytilesWebPartStrings';
import Displaytiles from './components/Displaytiles';
import { IzgnxCorouselProps } from './components/IzgnxCorouselProps';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { SPComponentLoader } from '@microsoft/sp-loader';
export interface IzgnxCarouselWebPartProps {
  description: string;
  Listname: string;
  Viewfieldname: string;
  Expandfieldname: String;
  Slideinterval: string;
}

export default class DisplaytilesWebPart extends BaseClientSideWebPart<IzgnxCarouselWebPartProps> {

  public render(): void {
    let cssUrl = "https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css";
    let customstyle ="https://betatestsolutions.sharepoint.com/sites/NaveenTest/SiteAssets/Displaytemplatestyles.css"
    SPComponentLoader.loadCss(cssUrl);
    SPComponentLoader.loadCss(customstyle);
    const element: React.ReactElement<IzgnxCorouselProps> = React.createElement(
      Displaytiles,
      {
        description: this.properties.description,
        Context:this.context,
        Listname: this.properties.Listname,
        Viewfieldname: this.properties.Viewfieldname,
        Expandfieldname: this.properties.Expandfieldname,
        Slideinterval: this.properties.Slideinterval


      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneTextField('Listname', {
                  label: "List Name"
                }),
                PropertyPaneTextField('Viewfieldname', {
                  label: "View Field Name"
                }),
                PropertyPaneTextField('Expandfieldname', {
                  label: "Expand Field Name"
                }),
                PropertyPaneTextField('Slideinterval', {
                  label: "Slide Interval"
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
