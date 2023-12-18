import React, {PropsWithChildren, ReactNode, useState} from 'react';
import {StyleSheet, View} from 'react-native';

import AccordionTrigger from './AccordionTrigger';
import {useColors} from '@/hooks';

export interface AccordionPorps {
  trigger: ReactNode;
  onOpen?: () => void;
  variant?: 'filled' | 'borderless';
}

export default function Accordion(props: PropsWithChildren<AccordionPorps>) {
  const {children, trigger, onOpen, variant = 'filled'} = props;
  const {colors} = useColors();

  const [open, setOpen] = useState(false);

  const variants = {
    filled: {
      background: colors.gray15,
      border: colors.gray20,
    },
    borderless: {
      background: 'transparent',
      border: 'transparent',
    },
  };

  const handleClick = () => {
    if (!open && onOpen) {
      onOpen();
    }
    setOpen(!open);
  };

  const styles = StyleSheet.create({
    accordion: {
      width: '100%',
      backgroundColor: open ? colors.gray15 : variants[variant].background,
      borderWidth: 1,
      borderColor: open ? colors.gray35 : variants[variant].border,
      borderRadius: 8,
    },
    accordionContent: {
      display: open ? 'flex' : 'none',
    },
  });

  return (
    <View style={styles.accordion}>
      <AccordionTrigger onClick={handleClick} isOpen={open}>
        {trigger}
      </AccordionTrigger>
      <View style={styles.accordionContent}>{children}</View>
    </View>
  );
}
