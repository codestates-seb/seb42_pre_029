package com.preproject.cloneStackOverflow.utils;

import org.springframework.beans.BeanWrapper;
import org.springframework.beans.BeanWrapperImpl;
import org.springframework.stereotype.Component;

import java.beans.PropertyDescriptor;
import java.lang.reflect.Field;

@Component
public class CustomBeanUtils<T> {
    public T copyNonNullProperties(T source, T destination) {
        if (source == null || destination == null || source.getClass() != destination.getClass()) {
            return null;
        }

        final BeanWrapper src = new BeanWrapperImpl(source);
        final BeanWrapper dest = new BeanWrapperImpl(destination);

        for (final Field field : source.getClass().getDeclaredFields()) {
            PropertyDescriptor propertyDescriptor = src.getPropertyDescriptor(field.getName());
            String propertyName = propertyDescriptor.getPropertyType().getSimpleName();
            if (propertyName.equals("List")) {
                continue;
            }
        }
        return destination;
    }
}
