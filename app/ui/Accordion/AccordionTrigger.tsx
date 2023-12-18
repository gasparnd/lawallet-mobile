import React, {useState, useEffect, ReactNode, PropsWithChildren} from 'react';
import {Pressable, StyleSheet} from 'react-native';

import {useColors} from '@/hooks';

export interface AccordionTriggerProps {
  children: ReactNode;
  onClick: () => void;
  isOpen: boolean;
}

export default function AccordionTrigger(
  props: PropsWithChildren<AccordionTriggerProps>,
) {
  const {children, onClick, isOpen} = props;
  const {colors} = useColors();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  const handleClick = () => {
    onClick();
  };

  const styles = StyleSheet.create({
    accordionTrigger: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 16,
      width: '100%',
      height: 60,
      paddingHorizontal: 16,
      backgroundColor: 'transparent',
      borderBottomWidth: 1,
      borderBottomColor: open ? colors.gray20 : 'transparent',
      color: colors.text,
      textAlign: 'left',
    },
  });

  return (
    <Pressable style={styles.accordionTrigger} onPress={handleClick}>
      {children}
      {/* <Icon size="small">
        <FontAwesomeIcon icon={faChevronDown} />
      </Icon> */}
    </Pressable>
  );
}
