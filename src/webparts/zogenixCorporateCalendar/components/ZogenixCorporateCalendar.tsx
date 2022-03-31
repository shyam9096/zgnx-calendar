import * as React from "react";
import { Icon } from "@fluentui/react/lib/Icon";
import { IZogenixCorporateCalendarProps } from "./IZogenixCorporateCalendarProps";
import spservices from "../../../services/spService";
import styles from "./ZogenixCorporateCalendar.module.scss";

interface ZogenixCorporateCalendarstate {
  allItems: any;
  ItemCount: any;
}

export default class ZogenixCorporateCalendar extends React.Component<
  IZogenixCorporateCalendarProps,
  ZogenixCorporateCalendarstate
> {
  private spService: spservices = null;

  constructor(props) {
    super(props);

    this.state = {
      allItems: [],
      ItemCount: parseInt(this.props.ItemCount),
    };

    const listName: any = this.props.Title;
    const category: any = this.props.Category;
    this.spService = new spservices(this.props.context, category, listName);
  }

  public async componentDidMount() {
    await this.getListItems();
  }
  public async getListItems() {
    this.spService.GetItems(this.state.ItemCount).then((items: any) => {
      console.log(items);
      this.setState({ allItems: items });
    });
  }
  public render(): React.ReactElement<IZogenixCorporateCalendarProps> {
    const calendarUrl =
      this.props.context.pageContext.site.absoluteUrl +
      "/Lists/" +
      this.props.Title +
      "/calendar.aspx";
    return (
      <div className={styles.zogenixCorporateCalendar}>
        <div className={styles.Calendar}>
          <div className={styles.Calendar_Heading}>
            <Icon iconName="CalendarWeek" className={styles.Icon} />
            <b>{this.props.Title}</b>
          </div>
          <div>
            <a href={calendarUrl}>
              <b>View-All</b>
            </a>
          </div>
        </div>
        <br />
        <div className={styles.row}>
          {this.state.allItems.map((items: any) => {
            let date = items.EventDate;
            let eventDate = date.split("T");
            return (
              <div className={styles.column}>
                <div className={styles.cardsInOneLIne}>
                  <h5 className={styles.cardHeader}>{eventDate[0]}</h5>
                  <h5 className={styles.pinkColorText}>
                    {items.Title}
                    <br />
                    <p className={styles.location}>
                      <b>{items.Location}</b>
                    </p>
                  </h5>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
function ItemCount(ItemCount: any) {
  throw new Error("Function not implemented.");
}
