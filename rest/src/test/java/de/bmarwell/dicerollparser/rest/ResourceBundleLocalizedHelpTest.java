package de.bmarwell.dicerollparser.rest;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import jakarta.ws.rs.core.UriInfo;
import java.net.URI;
import java.util.Locale;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
public class ResourceBundleLocalizedHelpTest {

    private ResourceBundleLocalizedHelp help;

    private final URI defaultUri = URI.create("http://localhost/");

    @BeforeEach
    public void initializeHelpClass() {
        this.help = new ResourceBundleLocalizedHelp();
        help.setMessageProvider(new ResourceBundleMessageProvider());
    }

    @Test
    public void get_help_useragent_curl_locale_english() {
        //  given
        help.setUserAgent(Agents.CURL);

        // when
        final String helpString = help.getHelp(defaultUri, Locale.ENGLISH);

        // then
        Assertions.assertThat(helpString)
                .isNotNull()
                .contains("Welcome to the Dice Parser")
                .contains("curl " + defaultUri + "roll?dice=2d6");
    }

    @Test
    public void get_help_useragent_curl_locale_german() {
        // given
        help.setUserAgent(Agents.CURL);

        // when
        final String helpString = help.getHelp(defaultUri, Locale.GERMAN);

        // then
        Assertions.assertThat(helpString)
                .isNotNull()
                .contains("Willkommen beim Würfelparser")
                .contains("curl " + defaultUri + "roll?dice=2d6");
    }
}
