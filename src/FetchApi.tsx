import {apply, bind, forEach, pipe, toPairs} from "ramda";
import {PureComponent, ReactNode} from "react";


export interface IFetchState<T> {
  error: Error | null;
  loading: boolean;
  result: T | null;
}


export interface IFetchProps<T extends {}> {
  path: string;
  params?: {[key: string]: {toString(): string}};
  children(status: IFetchState<T>): ReactNode | null;
}


export class FetchApi<T> extends PureComponent<IFetchProps<T>, IFetchState<T>> {
  public state = {
    error: null,
    loading: true,
    result: null,
  };

  public componentDidMount() {
    this.load();
  }

  public componentDidUpdate(prevProps: IFetchProps<T>) {
    if (prevProps.path !== this.props.path) {
      this.load();
    }
  }

  public render() {
    return this.props.children(this.state);
  }

  private load() {
    const empty = {
      error: null,
      loading: false,
      result: null,
    };

    this.setState(empty, () => {
      fetch(this.endpoint)
        .then(response => response.json())
        .then((result: T) => this.setState({...empty, result}))
        .catch(error => this.setState({...empty, error}));
    })
  }

  private get endpoint(): string {
    const {path, params = {}} = this.props;

    const url = new URL(window.document.location.href);
    url.pathname = path;
    url.search = "";

    const setParam = apply(bind(url.searchParams.set, url.searchParams));

    pipe(
      toPairs,
      forEach(setParam),
    )(params);

    return url.toString();
  }
}