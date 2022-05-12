import './Spinner.less';

type Props = {
  loading?: boolean;
};

export default function Spinner({ loading = false }: Props) {
  if (loading) {
    return <div className="loader" />;
  }

  return null;
}
