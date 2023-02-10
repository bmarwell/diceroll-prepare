package de.bmarwell.dicerollparser.rest;

import java.io.Serializable;
import java.util.Locale;

/**
 * Returns a localized (if available) message from a given bundle.
 */
public interface MessageProvider extends Serializable {

    String getString(String bundleName, Locale locale, String helpKey);
}
