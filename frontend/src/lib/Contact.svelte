<script lang="ts">
    import Link from '$lib/Link.svelte';
    import Button from '$lib/Button.svelte';
</script>

<form class="shadow-md text-left text-xl max-w-lg px-4 py-8 space-y-4 rounded-md bg-slate-200 dark:bg-slate-600 dark:text-slate-900" method="POST">
    <h2 class="text-center text-3xl dark:text-slate-100">get in touch</h2>
    <div class="grid grid-cols-2 gap-2">
        <label class="relative block">
            <span class="block text-lg font-medium text-slate-100 after:content-['*'] after:ml-0.5 after:text-red-500">first name</span>
            <input 
                class="block w-full border rounded-l-md p-2 shadow-sm text-slate-700 bg-slate-100 border-slate-300 focus:outline-none focus:border-indigo-700 focus:ring-indigo-700 focus:ring-1 placeholder:italic placeholder:text-slate-500" 
                placeholder="John" 
                required
                minlength="1"
                maxlength="50"
                name="fname"
            />
        </label>
        <label class="relative block">
            <span class="block text-lg font-medium text-slate-100">last name</span>
            <input 
                class="block w-full border rounded-r-md p-2 shadow-sm text-slate-700 bg-slate-100 border-slate-300 focus:outline-none focus:border-indigo-700 focus:ring-indigo-700 focus:ring-1 placeholder:italic placeholder:text-slate-500" 
                placeholder="Doe" 
                minlength="1"
                maxlength="50"
                name="lname"
            />
        </label>
    </div>
    <label class="relative block">
        <span class="block text-lg font-medium text-slate-100 after:content-['*'] after:ml-0.5 after:text-red-500">email</span>
        <input 
            type="email"
            class="block w-full border rounded-r-md p-2 shadow-sm text-slate-700 bg-slate-100 border-slate-300 focus:outline-none focus:border-indigo-700 focus:ring-indigo-700 focus:ring-1 placeholder:italic placeholder:text-slate-500" 
            placeholder="john.doe_420@website.com" 
            minlength="1"
            maxlength="60"
            name="email"
        />
    </label>
    <label class="relative block">
        <span class="block text-lg font-medium text-slate-100">organization</span>
        <input 
            class="block w-full border rounded-r-md p-2 shadow-sm text-slate-700 bg-slate-100 border-slate-300 focus:outline-none focus:border-indigo-700 focus:ring-indigo-700 focus:ring-1 placeholder:italic placeholder:text-slate-500" 
            placeholder="Your Next Customer, LLC" 
            minlength="1"
            maxlength="60"
            name="org"
        />
    </label>
    <label class="relative block">
        <span class="block text-lg font-medium text-slate-100 after:content-['*'] after:ml-0.5 after:text-red-500">tell me more</span>
        <textarea class="block w-full border rounded-r-md h-40 p-2 shadow-sm text-slate-700 bg-slate-100 border-slate-300 focus:outline-none focus:border-indigo-700 focus:ring-indigo-700 focus:ring-1 placeholder:italic placeholder:text-slate-500" 
            name="message" 
            placeholder="Are you in need of some software? Perhaps just a nerd to help your business? Or maybe you just want to complain about my most recent blog post... Regardless, you found the right place" 
            minlength="1"
            maxlength="1000" 
            required 
        />
    </label>
    <div class="flex justify-around dark:text-slate-100">
        <Link data={{}}>
            <input class="h-12 m-0 cursor-pointer" type="reset" value="reset" />
        
        </Link>
        <Button data={{title: 'submit', type:"submit"}} />
    </div>
</form>