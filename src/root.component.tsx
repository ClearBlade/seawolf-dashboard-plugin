import * as utils from 'microfrontendUtils';

export default function Root(props) {
  console.log('the URL', window.location.href);
  console.log('props', props);
  console.log('utils', utils);

  return (
    <div style={{ border: '1px solid red' }}>
      {props.name} is mounted! THIS IS A MICROFRONTEND FOR TESTING ON ASSETMODEL
    </div>
  );
}
