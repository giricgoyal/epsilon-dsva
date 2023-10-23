export type Props = {
  id?: string;
  width?: number;
  height?: number;
  data: {
    [key: string]: any;
  }[];
  title?: string;
  onClick?: Function;
  selected?: string;
};
