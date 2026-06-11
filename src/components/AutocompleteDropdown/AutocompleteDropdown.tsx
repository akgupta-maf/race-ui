import clsx from 'clsx';
import { Check, ChevronDown, X } from 'lucide-react';
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
          className='group mr-1 mb-1 inline-flex items-center gap-1 rounded-md border border-gray-300 bg-white px-1.5 py-0.5 shadow-xs'
        >
          <span className='max-w-20 truncate text-[10px] leading-3 font-semibold capitalize text-gray-700'>
            {sel.key.toLowerCase()}
          </span>
          <X
            onClick={() => {
              handleOptionClick(sel);
            }}
            className='h-3 w-3 cursor-pointer text-gray-500 transition-colors group-hover:text-gray-800'
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
        className={clsx(
          'relative block w-full cursor-pointer rounded-md border px-2 py-1.5 text-sm text-black transition-all',
          'bg-white shadow-xs hover:shadow-sm hover:border-gray-300',
          open ? 'border-gray-400 ring-2 ring-primary-20' : 'border-gray-200',
          loading && 'cursor-not-allowed opacity-70',
        )}
      >
        {props.label && selected.length ? (
          <span
            style={{
              fontSize: open || selected.length ? '10px' : '12px',
              lineHeight: '12px',
            }}
            className={clsx(
              'absolute left-1 px-1 transition-all bg-white text-gray-600',
              open || selected.length
                ? '-top-1.5 font-medium'
                : 'top-1/2 -translate-y-1/2 left-1 text-xs',
            )}
          >
            {props.label}
          </span>
        ) : null}
        <div className='flex min-h-5 items-center flex-wrap'>
          {getPlaceholderComponent()}
          {loading ? (
            <svg
              className='ml-auto h-4 w-4 animate-spin text-gray-500'
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
            <ChevronDown
              className={clsx(
                'ml-auto h-4 w-4 text-gray-600 transition-transform duration-200',
                open && 'rotate-180',
              )}
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
            'absolute z-50 mt-1 max-h-56 w-full overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg ring-1 ring-black/5',
          )}
        >
          {showSearch && (
            <div className='sticky top-0 z-10 border-b border-gray-100 bg-white p-2'>
              <input
                type='text'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder='Search...'
                className='w-full rounded-md border border-gray-300 px-2 py-1 text-xs text-gray-700 outline-none transition-colors focus:border-gray-400 focus:ring-2 focus:ring-primary-20'
              />
            </div>
          )}
          <ul
            className='py-1 text-sm text-gray-700'
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
                    <button
                      type='button'
                      className={clsx(
                        'block w-full px-3 py-2 text-left text-xs font-medium transition-colors',
                        isSelected
                          ? 'bg-primary-20/50 text-primary'
                          : 'hover:bg-gray-50',
                      )}
                    >
                      <Typography
                        variant='overline'
                        customClassname='flex items-center gap-2'
                      >
                        {String(option.key)}
                        {isSelected && (
                          <Check className='ml-auto h-4 w-4 text-primary' />
                        )}
                      </Typography>
                    </button>
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
