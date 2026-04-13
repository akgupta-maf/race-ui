import {
  CheckIcon,
  ChevronDownIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import Typography from '../Typography/Typography';

export interface SelectOption {
  key: string;
  value: string;
}

type SelectorProps = {
  options: SelectOption[];
  selected: SelectOption[];
  onSelect: (value: SelectOption[]) => void;
  placeholder?: string;
  label?: string;
  isMultiSelect?: boolean;
  showSearch?: boolean;
  loading?: boolean;
};

const AutocompleteDropdown = (props: SelectorProps) => {
  const {
    options,
    selected,
    onSelect,
    isMultiSelect,
    showSearch = true,
    loading,
  } = props;
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const listRef = useRef<any>(null);
  const buttonRef = useRef<any>(null);

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (
        open &&
        listRef.current &&
        !listRef.current.contains(e.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('click', checkIfClickedOutside);
    return () => {
      document.removeEventListener('click', checkIfClickedOutside);
    };
  }, [open]);

  const handleOptionClick = (option: SelectOption) => {
    let newSelected;
    if (isMultiSelect) {
      // Check if "All" option is selected
      if (option.key.toLowerCase() === 'all') {
        // If "All" is clicked, remove all other options and keep only "All"
        newSelected = [option];
      } else {
        // If any other option is clicked, remove "All" first
        const withoutAll = selected.filter(
          (sel) => sel.key.toLowerCase() !== 'all',
        );

        if (withoutAll.some((sel) => sel.value === option.value)) {
          newSelected = withoutAll.filter((sel) => sel.value !== option.value);
        } else {
          newSelected = [...withoutAll, option];
        }

        // Check if all options (excluding "All") are selected
        const allOption = options.find(
          (opt) => opt.key.toLowerCase() === 'all',
        );
        const nonAllOptions = options.filter(
          (opt) => opt.key.toLowerCase() !== 'all',
        );

        if (newSelected.length === nonAllOptions.length && allOption) {
          newSelected = [allOption];
        }
      }
    } else {
      newSelected = [option];
      setOpen(false);
    }
    onSelect(newSelected);
  };

  const getPlaceholderComponent = () => {
    if (selected.length > 1) {
      return selected.map((sel) => (
        <div
          key={sel.value}
          className='flex px-1 pt-0.5 border border-solid border-gray-400 mr-1 rounded-md items-center'
        >
          <span className='text-[10px] leading-3 truncate font-semibold capitalize'>
            {sel.key.toLowerCase()}
          </span>
          <XMarkIcon
            onClick={() => {
              handleOptionClick(sel);
            }}
            className='w-3 h-3 ml-1 cursor-pointer'
          />
        </div>
      ));
    } else if (selected.length === 1) {
      return (
        <span className='text-xs flex-1 truncate capitalize font-medium'>
          {selected[0].key}
        </span>
      );
    } else {
      return (
        <span className='text-xs text-primary'>
          {props.placeholder || 'Select options'}
        </span>
      );
    }
  };

  // Filter options based on search term
  const filteredOptions = options.filter((option) => {
    const optionKey = `${option.key}`;
    return optionKey.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className='w-full relative'>
      <div
        ref={buttonRef}
        onClick={() => {
          if (loading) return;
          setOpen((prev) => !prev);
        }}
        className='relative cursor-pointer bg-gray-50 border border-gray-200 text-black text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2 py-1.5'
      >
        {props.label && selected.length ? (
          <span
            style={{
              fontSize: open || selected.length ? '10px' : '12px',
              lineHeight: '12px',
            }}
            className={clsx(
              'absolute transition-all left-1 px-1 bg-gray-50',
              open || selected.length
                ? '-top-1.5 font-medium'
                : 'top-1/2 -translate-y-1/2 left-1 text-xs ',
            )}
          >
            {props.label}
          </span>
        ) : null}
        <div className='flex items-center flex-wrap'>
          {getPlaceholderComponent()}
          {loading ? (
            <svg
              className='animate-spin w-4 h-4 ml-auto text-gray-500'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
            >
              <circle
                className='opacity-25'
                cx='12'
                cy='12'
                r='10'
                stroke='currentColor'
                strokeWidth='4'
              />
              <path
                className='opacity-75'
                fill='currentColor'
                d='M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z'
              />
            </svg>
          ) : (
            <ChevronDownIcon
              className={clsx('w-4 h-4 ml-auto', open && 'rotate-180')}
            />
          )}
        </div>
      </div>

      {open && (
        <div
          ref={listRef}
          id='dropdown'
          style={{ zIndex: 200000 }}
          className={clsx(
            'transition-opacity z-50 absolute bg-white divide-y divide-gray-100 rounded-lg rounded-t-md shadow-md w-full max-h-48 overflow-y-auto',
          )}
        >
          {showSearch && (
            <div className='p-2'>
              <input
                type='text'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder='Search...'
                className='w-full px-2 py-1 border border-gray-300 rounded-md text-xs text-gray-700 focus:ring-blue-500 focus:border-blue-500'
              />
            </div>
          )}
          <ul
            className='py-2 text-sm text-gray-700'
            aria-labelledby='dropdownDefaultButton'
          >
            {filteredOptions.length ? (
              filteredOptions.map((option) => {
                const isSelected = selected.some(
                  (sel) => sel.value === option.value,
                );
                return (
                  <li
                    key={option.value}
                    onClick={() => handleOptionClick(option)}
                  >
                    <a
                      href='#'
                      className={clsx(
                        'block px-3 py-1.5 hover:bg-gray-100 text-xs font-medium',
                        isSelected ? 'bg-gray-100' : '',
                      )}
                    >
                      <Typography variant='overline' customClassname='flex'>
                        {String(option.key)}
                        {isSelected && (
                          <CheckIcon className='w-4 h-4 ml-auto' />
                        )}
                      </Typography>
                    </a>
                  </li>
                );
              })
            ) : (
              <li>
                <span className='block px-4 py-2 text-xs text-gray-500'>
                  No options found
                </span>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AutocompleteDropdown;
