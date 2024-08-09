'use client';

import { FC } from 'react';
import { ActionResult, handleSignIn } from './actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useFormState, useFormStatus } from 'react-dom';

interface FormSignInProps {}

const initialFormState: ActionResult = {
  errorTitle: null,
  errorDesc: [],
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full disabled:bg-gray-500 transition-all duration-300"
    >
      {pending ? 'Signing in...' : 'Sign in'}
    </Button>
  );
}

const FormSignIn: FC<FormSignInProps> = ({}) => {
  const [state, formAction] = useFormState(handleSignIn, initialFormState);

  console.log(state);

  return (
    <div className="w-full h-screen">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          {state.errorTitle !== null && (
            <div className="mx-auto mb-7 bg-red-500 w-full p-4 rounded-lg text-white">
              <p className="font-medium">Error Validation</p>

              <ul className="list-disc list-inside text-sm">
                {state.errorDesc?.map((desc, index) => (
                  <li key={index}>{desc}</li>
                ))}
              </ul>
            </div>
          )}

          <form action={formAction} className="space-y-6">
            <Input type="email" placeholder="Email..." name="email" />
            <Input type="password" placeholder="Password..." name="password" />

            <SubmitButton />
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormSignIn;
