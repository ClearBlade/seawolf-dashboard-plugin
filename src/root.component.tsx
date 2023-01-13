// @ts-ignore
// FOR NOW
// DON'T ACTUALLY IGNORE
import * as utils from 'microfrontendUtils';
//
import { Button } from '@mui/material';
import { useState } from 'react';
import Widgets from './components/Widgets';
import { useClients } from './mocks/api';

export default function Root(props) {
  console.log('the URL', window.location.href);
  console.log('props', props);
  console.log('utils', utils);
  const [activeParent, setActiveParent] = useState<string>();

  const assetQuery = utils.useAssetsQuery();
  console.log('assetQuery', assetQuery);

  const { data } = useClients();
  // Will need to fetch all parent id by type of "client" and then create a tab for each one. Each tab will contain the <Widgets>

  return (
    <div style={{ border: '1px solid red' }}>
      {data.map((parent) => (
        <Button onClick={() => setActiveParent(parent.id)}>
          View {parent.label}
        </Button>
      ))}
      <Widgets
        parent={
          !activeParent ? data[0] : data.find((p) => p.id === activeParent)
        }
      />
    </div>
  );
}
