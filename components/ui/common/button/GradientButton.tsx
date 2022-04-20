import React, { DetailedHTMLProps } from "react";
import s from "./GradientButton.module.sass";

type Props = DetailedHTMLProps<any, any> & {
  type: number;
  small?: boolean;
};
export default function GradientButton(props: Props) {
  const btnType =
    (props.type == 1 ? "bg-gradient-1 p-15px rounded-8px font-saira" : "") +
    (props.small ? ` ${s.small}` : "");

  const { className, type, small, ...restProps } = props;

  return <button className={`${btnType} ${className}`} {...restProps} />;
}

/**
 * Usage with Next Link only:
 * <Link href="..." passHref>
 *   <GradientLinkButton type={1} className={s.styleBtn}>
 *     Test
 *   </GradientLinkButton>
 * </Link/>
 *
 * https://nextjs.org/docs/api-reference/next/link#if-the-child-is-a-functional-component
 */
export const GradientLinkButton = React.forwardRef((props: Props, ref) => {
  const btnType =
    (props.type == 1 ? "bg-gradient-1 p-15px rounded-8px font-saira" : "") +
    (props.small ? ` ${s.small}` : "");

  const {
    className,
    type,
    small,
    href, // this will be pass from NextLink
    onClick,
    ...restProps
  } = props;

  return (
    <a
      ref={ref}
      href={href}
      onClick={onClick}
      className={`${btnType} ${className}`}
      {...restProps}
    />
  );
});
GradientLinkButton.displayName = "GradientLinkButton";
