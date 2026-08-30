# {{ .Title }}

**Author:** {{ site.Params.author | default site.Title }}

{{ if not .Date.IsZero }}
**Published:** {{ .Date.Format "2006-01-02" }}
{{ end }}

{{ with .GetTerms "tags" }}
**Tags:** {{ range $i, $tag := . }}{{ if $i }}, {{ end }}{{ $tag.LinkTitle }}{{ end }}
{{ end }}

**Canonical:** {{ .Permalink }}

{{ .RenderShortcodes }}
