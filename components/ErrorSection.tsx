import s from './ErrorSection.module.sass';

type Props = {
  code: string,
  message: string,
}
export default function ErrorSection(props: Props) {
  const {code, message} = props;
  return (
    <div className={s.container}>
      <div className={`${s.errorBox} box-glass`}>
        <p>Our app has caught a exception, sorry for inconvenient.</p>
        <p>We&apos;re try our best to fix it asap.</p>
        <br/>
        <p>This is the error detail:</p>
        <pre>code: {code}</pre>
        <pre>message: {message}</pre>
      </div>
    </div>
  )
}
