package de.bmarwell.dicerollparser.rest;

import jakarta.ws.rs.core.UriInfo;
import java.io.Serializable;
import java.net.URI;
import java.util.Locale;

/**
 * Returns a help String for the given URI and locale.
 *
 * <p>The UriInfo field is actually used as a first parameter only for formatting messages.</p>
 */
public interface LocalizedHelp extends Serializable {

    String getHelp(URI baseUri, Locale locale);
}
