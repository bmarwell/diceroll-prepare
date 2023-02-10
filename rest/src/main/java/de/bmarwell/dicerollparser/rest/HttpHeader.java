package de.bmarwell.dicerollparser.rest;

import static java.lang.annotation.RetentionPolicy.RUNTIME;

import jakarta.enterprise.util.Nonbinding;
import jakarta.inject.Qualifier;
import java.lang.annotation.Documented;
import java.lang.annotation.Retention;

@Qualifier
@Retention(RUNTIME)
@Documented
public @interface HttpHeader {

    /**
     * Header name.
     */
    @Nonbinding
    String value() default "";
}
