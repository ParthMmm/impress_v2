import React, { MutableRefObject, ReactElement, useEffect } from 'react';
import { useToast, ToastId } from '@chakra-ui/react';
interface Props {
  errors: string;
  data: any;
}

function Toasts({ errors, data }: Props): ReactElement {
  const toast = useToast();
  const toastIdRef:
    | MutableRefObject<undefined | string | ToastId>
    | string
    | undefined = React.useRef();
  const id = 'authToast';

  useEffect(() => {
    if (errors) {
      toast.closeAll();
      toastIdRef.current = toast({
        description: errors,
        status: 'error',
        duration: 5000,
        isClosable: true,
        id,
      });
    }
    if (data) {
      toast.closeAll();
      toastIdRef.current = toast({
        description: 'success! 🎉',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    }
    return function cleanup() {};
  }, [toast, errors, data]);
  return <></>;
}

export default Toasts;
