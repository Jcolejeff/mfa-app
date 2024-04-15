import { Eye, EyeOff } from 'lucide-react';
import { Control } from 'react-hook-form';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from './form';
import { Input, InputProps } from './input';

export interface TextFieldProps extends InputProps {
  control: Control<any, any>;
  name: string;
  label?: string;
  showPassword?: boolean;
  setShowPassword?: (value: boolean) => void;
}

function TextField({ control, name, label, placeholder = name, ...rest }: TextFieldProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="pb-2">
          <FormLabel>
            <p className="mb-2 text-xs text-text-dim">{label && label}</p>
            <div className="relative">
              <FormControl>
                <div>
                  <Input placeholder={placeholder} {...rest} {...field} />
                  {name === ('password' || 'confirm_password') && (
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 transform cursor-pointer">
                      {rest.showPassword ? (
                        <EyeOff
                          onClick={() => rest.setShowPassword && rest.setShowPassword(false)}
                          className="text-gray-400"
                        />
                      ) : (
                        <Eye
                          onClick={() => rest.setShowPassword && rest.setShowPassword(true)}
                          className="text-gray-400"
                        />
                      )}
                    </div>
                  )}
                </div>
              </FormControl>
            </div>
          </FormLabel>
          <FormMessage className="text-xs" />
        </FormItem>
      )}
    />
  );
}

export default TextField;
