import React, {
  MouseEventHandler,
  ReactElement,
  useRef,
  useState,
} from "react";
import Icon, { IconSizes } from "./Icon";
import chevronDown from "../assets/images/chevronDown.svg";
import loaderLogo from "../assets/images/loader.svg";
import useOnClickOutside from "../hooks/useOnClickOutside";

export const Dropdown: React.FC<{
  selected?: { icon_url?: string; title: string };
  showLogo?: boolean;
  children: DropdownListItemType;
  className?: string;
  listClassName?: string;
  widthFull?: boolean;
}> = ({
  selected,
  showLogo,
  children,
  className = "",
  listClassName = "",
  widthFull = false,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  useOnClickOutside(ref, () => setDropdownVisible(false));

  return selected ? (
    <div
      className={
        "group relative inline-block items-center" +
        (widthFull ? " w-full " : "")
      }
      ref={ref}
    >
      <button
        className={
          "flex items-center justify-between rounded-md text-sm font-normal leading-md text-labelSecondary md:text-lg" +
          (showLogo && selected.icon_url ? " mr-6 " : " bg-input p-lg ") +
          (widthFull ? " w-full " : " ") +
          className
        }
        onClick={() => setDropdownVisible(!dropdownVisible)}
      >
        <>
          <span className="mr-1.5 flex-shrink-0 md:mr-3.5">
            {showLogo && selected.icon_url ? (
              <Icon src={selected.icon_url} alt={selected.title} />
            ) : (
              selected.title
            )}
          </span>
          <Icon
            size={IconSizes.xs}
            src={chevronDown}
            alt={"Open dropdown icon"}
          />
        </>
      </button>
      {dropdownVisible ? (
        <div onClick={() => setDropdownVisible(false)}>
          <DropdownList className={listClassName} widthFull={widthFull}>
            {children}
          </DropdownList>
        </div>
      ) : (
        <></>
      )}
    </div>
  ) : (
    <Icon src={loaderLogo} alt="Loading dropdown items" />
  );
};
export const DropdownList: React.FC<{
  children: DropdownListItemType;
  className?: string;
  widthFull?: boolean;
}> = ({ children, className = "", widthFull = false }) => (
  <ul
    role="list"
    className={
      "pointer absolute z-20 rounded-lg bg-default p-2 text-labelSecondary drop-shadow-lg  " +
      (widthFull ? " w-full " : " ") +
      className
    }
  >
    {children}
  </ul>
);

type DropdownListItemType =
  | ReactElement<DropdownListItemProps>
  | Array<ReactElement<DropdownListItemProps>>;

type DropdownListItemProps = {
  onClick?: MouseEventHandler<HTMLLIElement>;
  className?: string;
};

export const DropdownListItem: React.FC<DropdownListItemProps> = ({
  children,
  onClick,
  className = "",
}) => (
  <li
    className={
      "whitespace-no-wrap flex cursor-pointer items-center bg-default py-2 px-6 text-left hover:bg-secondaryHover " +
      className
    }
    onClick={onClick}
  >
    {children}
  </li>
);

export default Dropdown;
