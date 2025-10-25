<script setup lang="ts">
definePageMeta({
    middleware: ['auth'],
});
</script>

<template>
    <div>
        <div class="mb-8">
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Privacy Policy</h1>
            <p class="text-gray-500 mt-2">Our commitment to your privacy</p>
        </div>

        <UCard>
            <div class="prose dark:prose-invert max-w-none">
                <h2>1. Introduction</h2>
                <p>
                    We are committed to protecting your privacy. This Privacy Policy explains how we collect, use,
                    disclose, and safeguard your information when you use our Invoice Manager application.
                </p>

                <h2>2. Information We Collect</h2>
                <p>
                    We may collect information about you in a variety of ways. The information we may collect on the
                    site includes:
                </p>
                <ul>
                    <li>Personal identification information (name, email address, phone number, etc.)</li>
                    <li>Invoice and payment information</li>
                    <li>Client and business details</li>
                    <li>Usage data and analytics</li>
                </ul>

                <h2>3. Use of Your Information</h2>
                <p>
                    Having accurate information about you permits us to provide you with a smooth, efficient, and
                    customized experience. Specifically, we may use information collected about you via the site to:
                </p>
                <ul>
                    <li>Create and manage your account</li>
                    <li>Generate and manage invoices</li>
                    <li>Process transactions</li>
                    <li>Send you related information and updates</li>
                    <li>Improve our services</li>
                </ul>

                <h2>4. Disclosure of Your Information</h2>
                <p>
                    We may share information we have collected about you in certain situations. Your information may be
                    disclosed as required by law and when we believe in good faith that disclosure is necessary to
                    protect our rights, your safety or the safety of others.
                </p>

                <h2>5. Security of Your Information</h2>
                <p>
                    We use administrative, technical, and physical security measures to protect your personal
                    information. We implement appropriate data collection, storage, and processing practices and
                    security measures to protect against unauthorized access, alteration, disclosure, or destruction of
                    your personal information.
                </p>

                <h2>6. Contact Us</h2>
                <p>
                    If you have questions or comments about this Privacy Policy, please contact us at
                    support@f2sistemas.com.br
                </p>
            </div>
        </UCard>
    </div>
</template>
