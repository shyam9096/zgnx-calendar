import * as React from 'react';
import styles from './Displaytiles.module.scss';
import { IzgnxCorouselProps } from './IzgnxCorouselProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { sp, List } from "@pnp/sp/presets/all";
import pnp, { Field } from 'sp-pnp-js';
import DisplaytemplatesService from "../../../Service/service";

var DTS = new DisplaytemplatesService();
var mypage;
export default class Displaytiles extends React.Component<IzgnxCorouselProps, {}> {
  public constructor(props: IzgnxCorouselProps) {
    super(props);
    mypage = this;
    
    mypage.state = {
      Displaytemplates: [],
      SiteUrl : mypage.props.Context.pageContext.web.absoluteUrl
    }
  }
  public async componentDidMount() {
    sp.setup({
       spfxContext: this.props.Context,
    });
    let allitems = await DTS.getItems(this.props.Listname,mypage.state.SiteUrl);
    mypage.setState({ Displaytemplates: allitems });
  }
  public render(): React.ReactElement<IzgnxCorouselProps> {
    return (
      <div className="row d-flex mainframe">
        {mypage.state.Displaytemplates.length > 0 ?
          mypage.state.Displaytemplates.map((element) => {
            return <div >
              <a href={element.Title} target='_blank tilelink'>
                <img className='tileimage' src={element.Thumbnail != "" && element.Thumbnail != undefined ? JSON.parse(element.Thumbnail).serverRelativeUrl : ""} ></img>
              <div className='tiletitle'>{element.VideoTitle}</div>
              </a>

            </div>;
          }) : ''}

            
      </div>
    );
  }
}
