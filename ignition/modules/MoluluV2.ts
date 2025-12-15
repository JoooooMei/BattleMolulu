import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';

export default buildModule('MoluluV2Module', (m) => {
  const moluluv2 = m.contract('MoluluV2');

  return { moluluv2 };
});
