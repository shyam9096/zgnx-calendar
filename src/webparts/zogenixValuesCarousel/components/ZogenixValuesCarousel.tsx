import * as React from "react";
import styles from "./ZogenixValuesCarousel.module.scss";
import { ICarousalProps } from "./IZogenixValuesCarouselProps";
import { escape } from "@microsoft/sp-lodash-subset";
import Carousel from "react-bootstrap/Carousel";
import spservices from "../../../services/spservices";
import "bootstrap/dist/css/bootstrap.css";
import { composeRenderFunction } from "office-ui-fabric-react";
import { ViewFields } from "@pnp/sp/views/types";

interface CarousalState {
  carousalData: any;
}
export default class Carousal extends React.Component<
  ICarousalProps,
  CarousalState
> {
  private spService: spservices = null;
  public constructor(props) {
    super(props);
    this.state = {
      carousalData: [],
    };
    this.spService = new spservices(this.props.context);
  }

  async componentDidMount() {
    var carousalData = await this.spService.getListItem(
      this.props.Listname,
      this.props.Viewfieldname,
      ""
    );

    this.setState({ carousalData: carousalData });
  }

  public render(): React.ReactElement<ICarousalProps> {
    return (
      <div className={styles.carousal}>
        {this.state.carousalData.length > 0 && (
          <Carousel fade={true} interval={this.props.timeout}>
            {this.state.carousalData.map((data) => {
              return (
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={data.ImageLink}
                    alt="First slide"
                  />
                </Carousel.Item>
              );
            })}
          </Carousel>
        )}
      </div>
    );
  }
}
