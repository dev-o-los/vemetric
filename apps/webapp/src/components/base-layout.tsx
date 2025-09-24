import { Flex, Link, Box } from '@chakra-ui/react';
import { useState } from 'react';
import { authClient } from '@/utils/auth';
import { Logo } from './logo';
import { PageWrapper } from './page-wrapper';
import { ThemeSwitch } from './theme-switch';

interface Props {
  children: React.ReactNode;
}

export const BaseLayout = (props: Props) => {
  const { children } = props;
  const [isLogoutLoading, setIsLogoutLoading] = useState(false);

  return (
    <>
      <Flex
        align="center"
        justify="space-between"
        bg={{ base: 'bg.card', md: 'none' }}
        px={{ base: 2, md: 5 }}
        pt={{ base: 2, md: 4 }}
        pb={{ base: 2, md: 0 }}
        borderBottom={{ base: '1px solid', md: 'none' }}
        borderColor="border.emphasized"
      >
        <Flex justify="center" w={{ base: 'auto', lg: '190px' }}>
          <Logo h={{ base: '32px', md: '44px' }} />
        </Flex>
        <Flex align="center" gap="4">
          <ThemeSwitch />
          <Box w="1px" h="20px" bg="border.emphasized" />
          <Link
            as="button"
            textStyle="sm"
            onClick={() => {
              if (isLogoutLoading) {
                return;
              }

              authClient.signOut({
                fetchOptions: {
                  onRequest: () => {
                    setIsLogoutLoading(true);
                  },
                },
              });
            }}
          >
            Logout
          </Link>
        </Flex>
      </Flex>
      <PageWrapper flexDir="column">{children}</PageWrapper>
    </>
  );
};
