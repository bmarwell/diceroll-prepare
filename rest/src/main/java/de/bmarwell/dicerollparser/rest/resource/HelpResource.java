package de.bmarwell.dicerollparser.rest.resource;

import de.bmarwell.dicerollparser.rest.LocalizedHelp;
import de.bmarwell.dicerollparser.rest.filter.LanguageFilter;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.servlet.ServletContext;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Request;
import jakarta.ws.rs.core.UriInfo;

@Path("/")
@ApplicationScoped
public class HelpResource {

    @Inject
    private LocalizedHelp localizedHelp;

    public HelpResource() {
        // cdi
    }

    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public String help(@Context Request request, @Context UriInfo uriInfo) {
        return localizedHelp.getHelp(
                uriInfo.getBaseUri(), request.selectVariant(LanguageFilter.VARIANTS).getLanguage());
    }

    public LocalizedHelp getLocalizedHelp() {
        return localizedHelp;
    }
}
