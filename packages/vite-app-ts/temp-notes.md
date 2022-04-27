#### TO CHANGE METAMASK NETWORK

          // console.log('totalSigs: ', totalSigs?.toNumber());
          const netWorkData = getNetworkInfo(137);
          const ethereum = window.ethereum;
          const data = [
            {
              chainId: `${hexlify(netWorkData?.chainId as number)}`,
              chainName: netWorkData?.name,
              // nativeCurrency: targetNetwork.nativeCurrency,
              rpcUrls: [netWorkData?.rpcUrl],
              blockExplorerUrls: [netWorkData?.blockExplorer],
            },
          ];
          try {
            const switchTx = await ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: data[0].chainId }],
            });
          } catch (error) {
            console.log('error: ', error);
          }
