import React from "react";
import {useIntl} from "react-intl";
import {FlexBox} from "../../../../box/flexbox";
import {NeonButton} from "../../../../buttons/neon-button";

export const DropzoneEmpty= () => {
  const intl = useIntl()

  return (
    <FlexBox>
      <NeonButton variant='default'>
        {intl.formatMessage({id: 'download'})}
      </NeonButton>
    </FlexBox>
  );
};
