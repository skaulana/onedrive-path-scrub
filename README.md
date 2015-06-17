# OneDrive Path Scrub

Has OneDrive on your Windows 8.1 machine also gone crazy lately, thrashing your disk
and causing the search indexer to eat your CPU? [Some posts][1] suggest that the bug
may be due to unusual characters in your folder paths. This is a small utility to help
find those potentially troublesome paths until Microsoft releases a proper fix.

## Usage

1. Get you some [node.js][2]
2. `npm install -g onedrive-path-scrub`
3. `onedrive-path-scrub` (add `-h` to see additional options)

## License

Made available to you under the [BSD][3]. See the included LICENSE.md.

[1]: http://blogs.catapultsystems.com/arafels/archive/2014/10/05/microsoft-onedrive-and-search-indexer-30-cpu-all-the-time-and-onedrive-stuck-saying-%E2%80%9Cchecking-for-changes%E2%80%9D-in-the-systray.aspx
[2]: https://nodejs.org/
[3]: https://en.wikipedia.org/wiki/BSD_licenses